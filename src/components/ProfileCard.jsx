const ProfileCard = ({ isOpen, email, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed right-4 top-16 z-50 w-65 max-w-xs rounded-3xl border border-green-200 bg-white p-4 shadow-2xl transition duration-300 ease-out">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-full rounded-3xl bg-green-50 p-4">
          <p className="truncate text-sm font-semibold text-green-800">{email}</p>
        </div>
        <button
          onClick={onLogout}
          className="w-full rounded-3xl bg-green-300 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;