'use client'

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'
import { PlusCircleIcon, UserCircleIcon, CogIcon, HomeIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar(): JSX.Element {
  const { user } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const [mounted, setMounted] = useState<boolean>(false)
  const pathname = usePathname()
  const isAdminPage = pathname === '/admin'

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth)
      setIsMobileMenuOpen(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Early return for server-side rendering
  if (!mounted) {
    return (
      <nav className="bg-white shadow-md" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="flex items-center gap-2 text-gray-800 font-semibold">
                <HomeIcon className="h-6 w-6" />
                <span className="text-lg">Plus Marketing</span>
              </span>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-blue-500/30 backdrop-blur-sm" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left side - Brand/Home */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="flex items-center gap-3 text-gray-100 hover:text-blue-400 font-bold transition-all duration-300"
              aria-label="Home"
            >
              <HomeIcon className="h-7 w-7 text-blue-400" />
              <span className="text-xl tracking-wider">PLUS MARKETING</span>
            </Link>
          </div>

          {/* Center - Action Buttons */}
          {user && (
            <div className="flex items-center gap-6">
              <Link 
                href="/create"
                className="flex items-center gap-2 text-gray-300 hover:text-blue-400 font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-blue-500/10"
                aria-label="Create Advertisement"
              >
                <PlusCircleIcon className="h-5 w-5" />
                <span className="text-sm">Create</span>
              </Link>
              
              {!isAdminPage && (
                <Link 
                  href="/admin"
                  className="flex items-center gap-2 text-gray-300 hover:text-blue-400 font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-blue-500/10"
                  aria-label="Delete Advertisement"
                >
                  <CogIcon className="h-5 w-5" />
                  <span className="text-sm">Manage Ad</span>
                </Link>
              )}
            </div>
          )}

          {/* Right side - User Menu */}
          {user && (
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-300 hover:text-blue-400 transition-all duration-300 rounded-lg hover:bg-blue-500/10"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {user && (
        <div 
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } backdrop-blur-md bg-gray-900/90 border-t border-blue-500/30`}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-4 pt-2 pb-3 space-y-2">
            <div className="flex items-center gap-2 px-3 py-2 text-gray-300">
              <UserCircleIcon className="h-6 w-6 text-blue-400" />
              <span className="font-medium">{user.email?.split('@')[0]}</span>
            </div>
            <Link
              href="/account"
              className="block text-gray-300 hover:text-blue-400 font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-blue-500/10"
              onClick={() => setIsMobileMenuOpen(false)}
              role="menuitem"
            >
              Account Settings
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left text-red-400 hover:text-red-300 font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-red-500/10"
              role="menuitem"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
