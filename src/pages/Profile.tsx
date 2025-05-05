import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import AvatarUpload from "../features/auth/profile/AvatarUpload"
import ProfileForm from "../features/auth/profile/ProfileForm"
import PasswordForm from "../features/auth/profile/PasswordForm"
import { updatePassword } from "firebase/auth"
import { auth, db, storage } from "../firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import toast from "react-hot-toast"

export default function ProfilePage() {
  const { user } = useAuth()
  const [displayName, setDisplayName] = useState("")
  const [bio, setBio] = useState("")
  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.uid) {
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()
          setDisplayName(data.displayName || "")
          setBio(data.bio || "")
          setAvatarPreview(data.avatarUrl || "")
        }
      }
    }
    fetchProfile()
  }, [user])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatar(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleSave = async () => {
    if (!user) return
    setIsLoading(true)

    try {
      let avatarUrl = avatarPreview

      if (avatar) {
        const avatarRef = ref(storage, `avatars/${user.uid}`)
        await uploadBytes(avatarRef, avatar)
        avatarUrl = await getDownloadURL(avatarRef)
      }

      await setDoc(doc(db, "users", user.uid), {
        displayName,
        bio,
        avatarUrl,
      })

      toast.success("Profile updated successfully!")
    } catch (error) {
      toast.error("Failed to update profile.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordUpdate = async () => {
    if (!user || newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setIsLoading(true)
    try {
      await updatePassword(user, newPassword)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      toast.success("Password updated successfully!")
    } catch (error) {
      toast.error("Failed to update password.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 p-5">My Profile</h1>

      <div className="flex items-center space-x-6 mb-10">
        <AvatarUpload avatarPreview={avatarPreview} handleAvatarChange={handleAvatarChange} />

        <div>
          <p className="text-lg font-medium">{displayName || "No Name"}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Profile</h2>
        <ProfileForm
          displayName={displayName}
          setDisplayName={setDisplayName}
          bio={bio}
          setBio={setBio}
          userEmail={user?.email || ""}
          onSave={handleSave}
          isLoading={isLoading}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Change Password</h2>
        <PasswordForm
          currentPassword={currentPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          setCurrentPassword={setCurrentPassword}
          setNewPassword={setNewPassword}
          setConfirmPassword={setConfirmPassword}
          onUpdate={handlePasswordUpdate}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
