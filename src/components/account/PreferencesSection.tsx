import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function PreferencesSection() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const auth = getAuth();
  const firestore = getFirestore();

  // Fetch preferences from Firestore on component mount
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        setError('');
        const user = auth.currentUser;

        if (!user) {
          throw new Error('No user is currently signed in.');
        }

        const docRef = doc(firestore, 'users', user.uid); // Assuming each user's preferences are stored under their UID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setEmailNotifications(data.emailNotifications ?? true);
          setMarketingEmails(data.marketingEmails ?? false);
        }
      } catch (err) {
        console.error('Error fetching preferences:', err);
        setError('Failed to load preferences.');
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [auth, firestore]);

  // Update preferences in Firestore when toggled
  const updatePreferences = async (field, value) => {
    try {
      setError('');
      const user = auth.currentUser;

      if (!user) {
        throw new Error('No user is currently signed in.');
      }

      const docRef = doc(firestore, 'users', user.uid);
      await setDoc(docRef, { [field]: value }, { merge: true });

      if (field === 'emailNotifications') {
        setEmailNotifications(value);
      } else if (field === 'marketingEmails') {
        setMarketingEmails(value);
      }
    } catch (err) {
      console.error('Error updating preferences:', err);
      setError('Failed to update preferences.');
    }
  };

  if (loading) {
    return <div>Loading preferences...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>

      {error && (
        <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-700">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive notifications about your account activity</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => updatePreferences('emailNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-700">Marketing Emails</p>
              <p className="text-sm text-gray-500">Receive updates about new products and offers</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={marketingEmails}
              onChange={(e) => updatePreferences('marketingEmails', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
