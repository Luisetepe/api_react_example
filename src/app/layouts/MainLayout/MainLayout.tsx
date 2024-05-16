import { ColorSchemeToggle } from '@app/components/shared/ColorSchemeToggle'
import { AppShell, Box, Burger, Code, Group, ScrollArea, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconAdjustments, IconMusic, IconPresentationAnalytics } from '@tabler/icons-react'
import { Outlet } from 'react-router-dom'
import classes from './MainLayout.module.css'
import { LinksGroup, SingleLink } from './NavbarLinksGroup'
import { UserButton } from './UserButton'

const appRoutes = [
	{
		label: 'Instruments',
		icon: IconMusic,
		initiallyOpened: true,
		links: [
			{ label: 'Browse instruments', link: '/instruments' },
			{ label: 'Add instrument', link: '/instruments/add' }
		]
	},
	{ label: 'Analytics', icon: IconPresentationAnalytics, link: '/analytics' },
	{ label: 'Settings', icon: IconAdjustments, link: '/settings' }
]

export function MainLayout() {
	const [opened, { toggle }] = useDisclosure()
	const links = appRoutes.map((item) => {
		if (item.links && Array.isArray(item.links)) {
			return <LinksGroup {...item} key={item.label} />
		}

		if (item.link) {
			return <SingleLink {...item} key={item.label} />
		}
	})

	return (
		<AppShell
			navbar={{
				width: rem(300),
				breakpoint: 'sm',
				collapsed: { mobile: !opened }
			}}
		>
			<AppShell.Header hiddenFrom="sm">
				<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
			</AppShell.Header>

			<AppShell.Navbar p="md" pb={0}>
				<div className={classes.header}>
					<Group justify="space-between">
						<Group justify="start">
							<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
							<Code fw={700}>Instruments Store</Code>
							<Code fw={700}>v1.0.0</Code>
						</Group>
						<ColorSchemeToggle />
					</Group>
				</div>
				<ScrollArea className={classes.links}>
					<div className={classes.routeLinks}>{links}</div>
				</ScrollArea>
				<div className={classes.user}>
					<UserButton />
				</div>
			</AppShell.Navbar>

			<AppShell.Main>
				<Box p="lg">
					<Outlet />
				</Box>
			</AppShell.Main>
		</AppShell>
	)
}
