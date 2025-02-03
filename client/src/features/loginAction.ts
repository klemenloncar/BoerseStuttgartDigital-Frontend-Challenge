export async function loginAction(formData: FormData): Promise<{ success: boolean; message?: string }> {
  const email = formData.get('email')
  const password = formData.get('password')

  if (typeof email !== 'string' || typeof password !== 'string') {
    return { success: false, message: 'Invalid input. Please provide both an email and a password.' }
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (!email.includes('user')) {
      throw new Error('Invalid credentials')
    }

    return { success: true }
  } catch (error: any) {
    console.error('Login error:', error)
    return { success: false, message: error.message || 'Login failed' }
  }
}
