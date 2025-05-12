
type Props = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
  setCurrentPassword: (val: string) => void
  setNewPassword: (val: string) => void
  setConfirmPassword: (val: string) => void
  onUpdate: () => void
  isLoading: boolean
}

export default function PasswordForm({
  currentPassword,
  newPassword,
  confirmPassword,
  setCurrentPassword,
  setNewPassword,
  setConfirmPassword,
  onUpdate,
  isLoading,
}: Props) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={onUpdate}
        disabled={isLoading || !currentPassword || !newPassword || !confirmPassword}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md shadow disabled:opacity-50"
      >
        {isLoading ? "Updating..." : "Update Password"}
      </button>
    </div>
  )
}
