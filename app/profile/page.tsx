import { Metadata } from 'next'
import ProfileClient from './ProfileClient'

export const metadata: Metadata = {
  title: 'My Profile - Hookah Rental',
  description: 'Manage your profile information and settings',
}

const ProfilePage = () => {
  return <ProfileClient />
}

export default ProfilePage
