import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Welcome({ auth }: PageProps) {
    return (
        <>
            <Head title="Modern Gallery" />
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                {/* Navigation */}
                <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <Link href="/" className="flex items-center space-x-2">
                                    <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-xl font-bold text-gray-900">Modern Gallery</span>
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
                        <div className="text-center">
                            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                                <span className="block">Capture & Share</span>
                                <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Your Memories
                                </span>
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-600">
                                A modern, elegant platform to organize, showcase, and share your photo collections with the world. Built for photographers and creators.
                            </p>
                            <div className="mt-10 flex justify-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-lg bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Get Started Free
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="rounded-lg border-2 border-indigo-600 px-8 py-4 text-lg font-semibold text-indigo-600 transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Sign In
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="bg-white py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                Everything you need to manage your photos
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Powerful features to help you organize and share your photography
                            </p>
                        </div>

                        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-2xl border border-gray-200 p-8 transition hover:shadow-lg">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                                    <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold text-gray-900">Unlimited Storage</h3>
                                <p className="mt-2 text-gray-600">
                                    Upload and store all your high-resolution photos without worrying about space limits.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-gray-200 p-8 transition hover:shadow-lg">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold text-gray-900">Secure & Private</h3>
                                <p className="mt-2 text-gray-600">
                                    Your photos are encrypted and protected with enterprise-grade security measures.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-gray-200 p-8 transition hover:shadow-lg">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100">
                                    <svg className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold text-gray-900">Easy Sharing</h3>
                                <p className="mt-2 text-gray-600">
                                    Share your galleries with friends, family, or the world with customizable privacy settings.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-gray-200 p-8 transition hover:shadow-lg">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold text-gray-900">Smart Organization</h3>
                                <p className="mt-2 text-gray-600">
                                    Tag, categorize, and search your photos effortlessly with AI-powered organization.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-gray-200 p-8 transition hover:shadow-lg">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold text-gray-900">Mobile Ready</h3>
                                <p className="mt-2 text-gray-600">
                                    Access your galleries anywhere, anytime with our responsive design and mobile apps.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-gray-200 p-8 transition hover:shadow-lg">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                                    <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold text-gray-900">Lightning Fast</h3>
                                <p className="mt-2 text-gray-600">
                                    Experience blazing-fast uploads and downloads with our optimized infrastructure.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                {!auth.user && (
                    <div className="bg-indigo-600 py-16">
                        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-bold text-white sm:text-4xl">
                                Ready to get started?
                            </h2>
                            <p className="mt-4 text-xl text-indigo-100">
                                Join thousands of photographers already using Modern Gallery
                            </p>
                            <div className="mt-8">
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-indigo-600 shadow-lg transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                                >
                                    Create Your Free Account
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <footer className="bg-gray-50 py-12">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <p className="text-sm text-gray-600">
                            &copy; {new Date().getFullYear()} Modern Gallery. Built with Laravel & React.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
