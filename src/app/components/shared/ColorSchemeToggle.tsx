import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { IconSunMoon } from '@tabler/icons-react'

export function ColorSchemeToggle() {
	const { toggleColorScheme, colorScheme } = useMantineColorScheme()
	const isDarkMode = colorScheme === 'dark'

	return (
		<ActionIcon
			aria-label="Change theme"
			onClick={() => toggleColorScheme()}
			size="md"
			variant="outline"
			color={isDarkMode ? 'white' : 'dark'}
		>
			<IconSunMoon style={{ width: '70%', height: '70%' }} stroke={1.5} />
		</ActionIcon>
	)
}
