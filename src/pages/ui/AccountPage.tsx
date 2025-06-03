import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, UserPlus, Key,  Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector, AppDispatch } from "@/store";
import { RootState } from "@/store/reducer";
// import { HttpStatusCode } from "@/constants";

interface user{

  firstName: string | null;
  lastName: string | null;
  officialEmail: string;
  primaryPhone: string | null;
  username: string;
}
const AccountPage = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [resetEmail, setResetEmail] = useState(user?.email || "");
  const [profileData, setProfileData] = useState<user>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    officialEmail: user?.officialEmail || '',
    primaryPhone: user?.primaryPhone || '',
    username: user?.username || '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
   
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
   
  };

  const handleSignOut = async () => {
    // dispatch(logout());
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
   
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">My Account</h1>

        {/* Profile Section */}
        <div className="bg-white rounded-md shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Your Profile</h2>
            <Button
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-md py-2 px-4 text-sm font-medium"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
  <div>
    <label className="text-sm font-medium text-gray-900 mb-1 block">Username</label>
    <Input
      value={profileData.username}
      onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
      disabled={!isEditing}
      className="border-gray-300 rounded-md text-sm"
    />
  </div>
  <div>
    <label className="text-sm font-medium text-gray-900 mb-1 block">First Name</label>
    <Input
      value={profileData.firstName}
      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
      disabled={!isEditing}
      className="border-gray-300 rounded-md text-sm"
    />
  </div>
  <div>
    <label className="text-sm font-medium text-gray-900 mb-1 block">Last Name</label>
    <Input
      value={profileData.lastName}
      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
      disabled={!isEditing}
      className="border-gray-300 rounded-md text-sm"
    />
  </div>
  <div>
    <label className="text-sm font-medium text-gray-900 mb-1 block">Official Email</label>
    <Input
      type="email"
      value={profileData.officialEmail}
      onChange={(e) => setProfileData({ ...profileData, officialEmail: e.target.value })}
      disabled={!isEditing}
      className="border-gray-300 rounded-md text-sm"
    />
  </div>
  <div>
    <label className="text-sm font-medium text-gray-900 mb-1 block">Primary Phone</label>
    <Input
      value={profileData.primaryPhone}
      onChange={(e) => setProfileData({ ...profileData, primaryPhone: e.target.value })}
      disabled={!isEditing}
      className="border-gray-300 rounded-md text-sm"
    />
  </div>

  {isEditing && (
    <Button
      type="submit"
      className="bg-red-600 hover:bg-red-700 text-white rounded-md py-2 px-4 text-sm font-medium"
    >
      Save Changes
    </Button>
  )}
</form>

        </div>

        {/* Actions Section */}
        <div className="bg-white rounded-md shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Account Actions</h2>
          <div className="space-y-3">
            <Button
              onClick={() => setShowInviteModal(true)}
              className="w-full flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-md py-3 px-4 text-sm font-medium text-gray-900 border border-gray-300"
            >
              <span>Invite a Friend</span>
              <UserPlus className="h-5 w-5 text-red-600" />
            </Button>
            <Button
              onClick={() => setShowResetModal(true)}
              className="w-full flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-md py-3 px-4 text-sm font-medium text-gray-900 border border-gray-300"
            >
              <span>Reset Password</span>
              <Key className="h-5 w-5 text-red-600" />
            </Button>
            <Button
              onClick={handleSignOut}
              className="w-full flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-md py-3 px-4 text-sm font-medium text-gray-900 border border-gray-300"
            >
              <span>Sign Out</span>
              <LogOut className="h-5 w-5 text-red-600" />
            </Button>
          </div>
        </div>

        {/* Invite User Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-md p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Invite a Friend</h2>
              <form onSubmit={handleInviteUser} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-900 mb-1 block">Email</label>
                  <Input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="Enter friend's email"
                    className="border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-md py-2 text-sm font-medium"
                  >
                    <Send className="h-4 w-4 mr-2" /> Send Invite
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowInviteModal(false)}
                    className="flex-1 border-gray-300 text-gray-900 hover:bg-gray-100 rounded-md py-2 text-sm font-medium"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reset Password Modal */}
        {showResetModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-md p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Reset Password</h2>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-900 mb-1 block">Email</label>
                  <Input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-md py-2 text-sm font-medium"
                  >
                    <Send className="h-4 w-4 mr-2" /> Send Reset Link
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowResetModal(false)}
                    className="flex-1 border-gray-300 text-gray-900 hover:bg-gray-100 rounded-md py-2 text-sm font-medium"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;