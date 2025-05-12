
type Props = {
  displayName: string
  setDisplayName: (val: string) => void
  bio: string
  setBio: (val: string) => void
  userEmail: string
  onSave: () => void
  isLoading: boolean
}

export default function ProfileForm({
  displayName,
  setDisplayName,
  bio,
  setBio,
  userEmail,
  onSave,
  isLoading,
}: Props) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your full name"
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          value={userEmail}
          disabled
          className="w-full rounded-md bg-gray-100 px-4 py-2 text-gray-500 border border-gray-200"
        />
        <p className="text-xs text-gray-500 mt-1">To change your email, contact support.</p>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          placeholder="Tell us a little about yourself..."
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <button
        onClick={onSave}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md shadow disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Save Profile"}
      </button>
    </div>
  )
}
