import { useEffect } from 'react'
import { supabase } from '@/helpers/initSupabase'
import useStore from '@/helpers/store'

const useHandleLogin = () => {
  const user = supabase.auth.user()

  const fetchUserProfile = async (id) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', id)

    return data[0]
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setUser = async () => {
    const profile = await fetchUserProfile(user.id)
    useStore.setState({
      user: {
        ...user,
        profile,
      },
    })
  }

  useEffect(() => {
    if (user) setUser()
  }, [setUser, user])

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const profile = await fetchUserProfile(session?.user.id)
          useStore.setState({
            user: {
              ...session?.user,
              profile,
            },
          })
        } else {
          useStore.setState({ user: null })
        }

        fetch('/api/auth', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json())

        if (event === 'SIGNED_IN') {
          const { user } = session
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user.id)

          if (!data.length) {
            await supabase.from('profiles').insert([
              {
                user_id: user.id,
                name: user.user_metadata.full_name || user.email,
                avatar: user.user_metadata.avatar_url,
              },
            ])
            useStore.setState({
              user: {
                ...user,
                profile: data[0],
              },
            })
          }
        }
      }
    )

    return () => {
      authListener.unsubscribe()
    }
  }, [])
}

export default useHandleLogin
