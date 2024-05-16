import { Box, Collapse, Group, ThemeIcon, UnstyledButton, rem } from '@mantine/core'
import { IconChevronRight, type Icon, type IconProps } from '@tabler/icons-react'
import { useState, type RefAttributes } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './NavbarLinksGroup.module.css'

type LinksGroupProps = {
	icon: React.FC<Omit<IconProps, 'ref'> & RefAttributes<Icon>>
	label: string
	initiallyOpened?: boolean
	links: { label: string; link: string }[]
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links }: LinksGroupProps) {
	const [opened, setOpened] = useState(initiallyOpened || false)
	const items = links.map((link) => (
		<NavLink
			className={({ isActive }) => (isActive ? classes.activeLink : classes.link)}
			to={link.link}
			key={link.label}
			end
		>
			<div>{link.label}</div>
		</NavLink>
	))

	return (
		<>
			<UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
				<Group justify="space-between" gap={0}>
					<Box style={{ display: 'flex', alignItems: 'center' }}>
						<ThemeIcon variant="dark" size={30}>
							<Icon style={{ width: rem(18), height: rem(18) }} />
						</ThemeIcon>
						<Box ml="md">{label}</Box>
					</Box>
					<IconChevronRight
						className={classes.chevron}
						stroke={1.5}
						style={{
							width: rem(16),
							height: rem(16),
							transform: opened ? 'rotate(-90deg)' : 'none'
						}}
					/>
				</Group>
			</UnstyledButton>
			<Collapse in={opened}>{items}</Collapse>
		</>
	)
}

type SingleLinkProps = {
	icon: React.FC<Omit<IconProps, 'ref'> & RefAttributes<Icon>>
	label: string
	link: string
}

export function SingleLink({ icon: Icon, label, link }: SingleLinkProps) {
	return (
		<NavLink
			className={({ isActive }) => (isActive ? classes.activeSingleLink : classes.singleLink)}
			to={link}
			end
		>
			<Group justify="space-between" gap={0}>
				<Box style={{ display: 'flex', alignItems: 'center' }}>
					<ThemeIcon variant="dark" size={30}>
						<Icon style={{ width: rem(18), height: rem(18) }} />
					</ThemeIcon>
					<Box ml="md">{label}</Box>
				</Box>
			</Group>
		</NavLink>
	)
}
