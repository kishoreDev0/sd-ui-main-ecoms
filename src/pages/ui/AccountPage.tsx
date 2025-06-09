import { useState } from "react";
import { LogOut, UserPlus, Key, Send, User, Mail, Phone, Edit3, X, Settings, Shield } from "lucide-react";
import { useAppSelector } from "@/store";
import { RootState } from "@/store/reducer";

// Simulated data for demo
const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  officialEmail: 'john.doe@company.com',
  primaryPhone: '+1 (555) 123-4567',
  username: 'johndoe'
};

interface UserType {
  firstName: string | null;
  lastName: string | null;
  officialEmail: string;
  primaryPhone: string | null;
  username: string;
}

const AccountPage = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [resetEmail, setResetEmail] = useState(mockUser?.officialEmail || "");
  const [profileData, setProfileData] = useState<UserType>({
    firstName: mockUser?.firstName || '',
    lastName: mockUser?.lastName || '',
    officialEmail: mockUser?.officialEmail || '',
    primaryPhone: mockUser?.primaryPhone || '',
    username: mockUser?.username || '',
  });

  const { user} = useAppSelector((state:RootState) => state.auth)

  const [isEditing, setIsEditing] = useState(false);

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Invite sent to:', inviteEmail);
    setShowInviteModal(false);
    setInviteEmail('');
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reset link sent to:', resetEmail);
    setShowResetModal(false);
  };

  const handleSignOut = () => {
    console.log('Signing out...');
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', profileData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">My Account</h1>
          <p className="text-blue-100 mt-1">Manage your profile and account settings</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Hello,</h3>
                    <p className="text-sm text-gray-600">{user?.firstName} {user?.lastName}</p>
                  </div>
                </div>
              </div>
              <div className="p-0">
                <div className="space-y-1">
                  <div className="px-4 py-3 bg-blue-50 border-r-4 border-blue-600 text-blue-700 font-medium text-sm flex items-center gap-3">
                    <User className="w-4 h-4" />
                    Account Information
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 text-sm flex items-center gap-3">
                    <Settings className="w-4 h-4" />
                    Account Settings
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 text-sm flex items-center gap-3">
                    <Shield className="w-4 h-4" />
                    Security
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Section */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b bg-gray-50">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                  <button
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    {isEditing ? "Cancel" : "Edit"}
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                      value={`${user?.firstName} ${user?.lastName}` || `${user?.firstName} ${user?.lastName}}` }
                      onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      value={user?.firstName || ''}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      value={user?.lastName || ''}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={user?.officialEmail}
                      onChange={(e) => setProfileData({ ...profileData, officialEmail: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                    <input
                      value={user?.primaryPhone || ''}
                      onChange={(e) => setProfileData({ ...profileData, primaryPhone: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 pt-4 border-t">
                    <button
                      onClick={handleUpdateProfile}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <UserPlus className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Invite Friends</h3>
                  <p className="text-sm text-gray-600 mb-4">Invite your friends to join</p>
                  <button
                    onClick={() => setShowInviteModal(true)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Send Invite
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                    <Key className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Reset Password</h3>
                  <p className="text-sm text-gray-600 mb-4">Change your password</p>
                  <button
                    onClick={() => setShowResetModal(true)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Reset Now
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                    <LogOut className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Sign Out</h3>
                  <p className="text-sm text-gray-600 mb-4">Sign out of your account</p>
                  <button
                    onClick={handleSignOut}
                    className="w-full bg-blue-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invite User Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md shadow-2xl">
              <div className="px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <UserPlus className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Invite a Friend</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="Enter friend's email address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleInviteUser}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Send className="h-4 w-4" /> Send Invite
                    </button>
                    <button
                      onClick={() => setShowInviteModal(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-600 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reset Password Modal */}
        {showResetModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md shadow-2xl">
              <div className="px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                    <Key className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Reset Password</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleResetPassword}
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Send className="h-4 w-4" /> Send Reset Link
                    </button>
                    <button
                      onClick={() => setShowResetModal(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-600 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;