import LocalizedStrings from 'react-localization';

export const lang = new LocalizedStrings( {
	en: {
		brand: 'Fables',
		chooseRegion: 'Language',
		loading: 'Loading',
		toggleMenu: 'Toggle Menu',
		warnings: {
			enableIframes: 'You Must Enable iFrames to view this video'
		},
		general: {
			login: 'Login',
			register: 'Register',
			submit: 'Submit',
			add: 'add'
		},
		helmet: {
			siteTitle: ' 😈 Fables '
		},
		login: {
			title: 'Login',
			submit: 'Submit',
			username: 'Username',
			password: 'Password',
			subtag: 'Login to start making new fables.'
		},
		register: {
			title: 'Register',
			submit: 'Submit',
			username: 'Username',
			password: 'Password',
			subtag: 'Register to start making new fables.'
		},
		newFable: {
			title: 'New Fable',
			subtag: 'Make you own fable.',
			submit: 'Submit',
			fableName: 'Fable Name',
			password: 'Password'
		},
		navigation: {
			mainmenu: [
				{
					type: 'internal',
					href: '/',
					display: 'Home'
        },
				{
					type: 'internal',
					href: '/fables',
					display: 'Fables'
        },
				{
					type: 'internal',
					href: '/new-fable',
					display: 'New Fable'
        }
      ]
		},
		footer: {
			brand: 'Fables',
			placeholder: 'Placeholder link',
			terms: 'Terms of Service',
			copy: 'No one at all.',
			placeholderHref: '#'
		},
		home: {
			title: 'Home'
		},
		fables: {
			title: 'Fables',
			subtag: 'Read some of the newest fables.'
		},
		fable: {
			title: 'Post',
			subtag: 'You are now reading...',
			newMessage: 'New Message',
			newCharacter: 'New Character',
			messageCharacter: 'Message Character',
			messageType: 'Message Type',
			nextMessage: 'Tap or Click for Next Message',
			endMessage: 'The End',
			back: 'Back'
		},
		videos: {
			title: 'Videos',
			playVideo: 'Play Video',
			videos: [
        [
					{
						title: 'Obligatory Big Buck Bunny',
						desc: 'Video Desc',
						video: `http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_20mb.mp4`,
						type: 'default',
						poster: 'https://peach.blender.org/wp-content/uploads/bbb-splash.png?x11217'
          },
					{
						title: 'Obligatory Rick Roll',
						desc: 'Video Desc',
						video: 'dQw4w9WgXcQ',
						type: 'youtube'
          },
					{
						title: 'Obligatory Rick Roll',
						desc: 'Video Desc',
						video: 'dQw4w9WgXcQ',
						type: 'youtube'
          },
					{
						title: 'Obligatory Rick Roll',
						desc: 'Video Desc',
						video: 'dQw4w9WgXcQ',
						type: 'youtube'
          },
					{
						title: 'Obligatory Rick Roll',
						desc: 'Video Desc',
						video: 'dQw4w9WgXcQ',
						type: 'youtube'
          }
        ]
      ]
		},
		nomatch: {
			title: 'Page Not Found'
		}
	}
} );
