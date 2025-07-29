import React, { useState } from "react";
import {
  FiLock,
  FiShield,
  FiClock,
  FiStar,
  FiTrash2,
  FiPower,
  FiX,
} from "react-icons/fi";

const SettingsPage = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show2FAMessage, setShow2FAMessage] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handlePasswordUpdate = () => {
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordUpdated(true);
    setPasswordError("");
    setShowPasswordForm(false);
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordUpdated(false), 3000);
  };

  const handleUpgradeClick = () => {
    alert("Please pay ₹500 to unlock Premium features.");
    setShowPremiumModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-800 dark:text-gray-200">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 space-y-12">
        {/* Password & Security */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">🔐 Password & Security</h2>
          <div className="space-y-6">
            {/* Password */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-lg flex items-center gap-2">
                  <FiLock /> Account Password
                </p>
                <button
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="bg-gray-800 text-white px-4 py-1.5 rounded hover:bg-gray-700 transition"
                >
                  {showPasswordForm ? "Cancel" : "Set Password"}
                </button>
              </div>

              {showPasswordForm && (
                <div className="mt-4 space-y-3">
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded border dark:bg-gray-600"
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded border dark:bg-gray-600"
                  />
                  <button
                    onClick={handlePasswordUpdate}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Update Password
                  </button>
                </div>
              )}

              {passwordUpdated && (
                <p className="text-sm text-green-500 mt-3">✅ Password updated successfully!</p>
              )}
              {passwordError && (
                <p className="text-sm text-red-500 mt-3">⚠️ {passwordError}</p>
              )}
            </div>

            {/* 2FA */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-lg flex items-center gap-2">
                  <FiShield /> Two-Factor Authentication
                </p>
                <button
                  onClick={() => setShow2FAMessage(true)}
                  className="bg-gray-800 text-white px-4 py-1.5 rounded hover:bg-gray-700 transition"
                >
                  Enable 2FA
                </button>
              </div>
              {show2FAMessage && (
                <p className="text-sm text-green-400 mt-2">
                  📩 2FA setup instructions sent to your email.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Third Party Accounts */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">🔗 Third Party Accounts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Google",
                linked: true,
                color: "bg-red-100",
                action: "Unlink",
                img: "https://cdn-icons-png.flaticon.com/512/281/281764.png"
              },
              {
                name: "Zoom",
                linked: false,
                color: "bg-blue-100",
                action: "Link",
                img: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png"
              },
              {
                name: "Ethereum",
                linked: false,
                color: "bg-purple-100",
                action: "Link",
                img: "https://cdn-icons-png.flaticon.com/512/7016/7016523.png"
              },
              {
                name: "Solana",
                linked: false,
                color: "bg-green-100",
                action: "Link",
                img: "https://cdn-icons-png.flaticon.com/512/10835/10835860.png"
              }
            ].map(({ name, color, action, img }) => (
              <div
                key={name}
                className={`p-4 ${color} rounded-xl text-center shadow-md transition hover:scale-105`}
              >
                <img src={img} alt={`${name} logo`} className="w-12 h-12 mx-auto mb-3" />
                <p className="font-semibold text-gray-800">{name}</p>
                <button className="mt-2 text-sm text-blue-700 underline">{action}</button>
              </div>
            ))}
          </div>
        </section>

        {/* Premium Features */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">💎 Premium Features</h2>
          <div className="bg-yellow-100 dark:bg-yellow-200 p-6 rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <p className="font-semibold text-lg flex items-center gap-2"><FiStar /> Premium Access</p>
              <p className="text-sm text-gray-600">Unlock exclusive features & content.</p>
            </div>
            <button
              onClick={() => setShowPremiumModal(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              Upgrade
            </button>
          </div>
        </section>

        {/* Session Timeout */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">⏱️ Session Timeout</h2>
          <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm">
            <div>
              <p className="font-semibold text-lg flex items-center gap-2"><FiClock /> Auto Logout</p>
              <p className="text-sm text-gray-500">Set idle time before auto-logout (in minutes).</p>
            </div>
            <input type="number" className="w-24 px-3 py-2 rounded border dark:bg-gray-600" defaultValue={30} />
          </div>
        </section>

        {/* Account Actions */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">⚠️ Account Actions</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-6 bg-orange-100 dark:bg-yellow-700 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 text-yellow-900 dark:text-yellow-100">
                <FiPower className="text-xl" />
                <p className="font-semibold">Deactivate Account</p>
              </div>
              <button
                onClick={() => setShowDeactivateConfirm(true)}
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
              >
                Deactivate
              </button>
            </div>

            <div className="flex items-center justify-between p-6 bg-red-100 dark:bg-red-700 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 text-red-800 dark:text-white">
                <FiTrash2 className="text-xl" />
                <p className="font-semibold">Delete Account Permanently</p>
              </div>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Upgrade to Premium</h3>
              <button onClick={() => setShowPremiumModal(false)} className="text-gray-500 hover:text-red-500 text-xl">
                <FiX />
              </button>
            </div>
            <ul className="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-300">
              <li>✅ Unlimited Access</li>
              <li>✅ Ad-Free Experience</li>
              <li>✅ Early Feature Access</li>
            </ul>
            <button
              onClick={handleUpgradeClick}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded font-semibold"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      {/* Confirm Deactivate */}
      {showDeactivateConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold mb-3">Are you sure you want to deactivate your account?</h3>
            <div className="flex justify-center gap-4">
              <button onClick={() => setShowDeactivateConfirm(false)} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded">
                Cancel
              </button>
              <button onClick={() => alert("Account Deactivated")} className="px-4 py-2 bg-yellow-600 text-white rounded">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold mb-3 text-red-600">Are you sure you want to permanently delete your account?</h3>
            <p className="text-sm text-gray-500 mb-4">This action is irreversible.</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded">
                Cancel
              </button>
              <button onClick={() => alert("Account Deleted")} className="px-4 py-2 bg-red-600 text-white rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
