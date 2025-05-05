import React from "react"
import { Camera } from "lucide-react"

type Props = {
  avatarPreview: string
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AvatarUpload({ avatarPreview, handleAvatarChange }: Props) {
  return (
    <div className="relative w-28 h-28 rounded-full overflow-hidden border border-gray-300 bg-gray-100">
      {avatarPreview ? (
        <img src={avatarPreview} alt="User Avatar" className="w-full h-full object-cover" />
      ) : (
        <div className="flex justify-center items-center w-full h-full text-gray-400">
          <Camera className="w-12 h-12" />
        </div>
      )}

      <label htmlFor="avatar-upload" className="absolute inset-0 cursor-pointer group">
        <div className="absolute bottom-0 w-full bg-black/40 text-white text-xs text-center py-1 opacity-0 group-hover:opacity-100 transition">
          Change Photo
        </div>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
        />
      </label>
    </div>
  )
}
