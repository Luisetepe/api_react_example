import { Badge, Box, Button, Card, Grid, Group, Image, ScrollArea, Text, rem } from '@mantine/core'
import { useEffect, useState } from 'react'

export function InstrumentsListPage() {
	const [instruments, setInstruments] = useState<
		{
			id: string
			name: string
			description: string
			price: number
			imageUrl: string
		}[]
	>([])

	useEffect(() => {
		fetch('http://localhost:3000/api/instruments')
			.then((response) => response.json())
			.then((data) => setInstruments(data))
	}, [])

	return (
		<Grid gutter={40}>
			{instruments.map((instrument) => (
				<Grid.Col span={{ base: 12, md: 6, lg: 6 }} key={instrument.id}>
					<Card
						shadow="sm"
						padding="lg"
						radius="md"
						withBorder
						h={rem(400)}
						style={{ justifyContent: 'space-between' }}
					>
						<Box>
							<Card.Section pt={12}>
								<Image
									src={instrument.imageUrl}
									height={160}
									radius="md"
									fit="contain"
									alt="instrument"
								/>
							</Card.Section>

							<Group justify="space-between" mt="md" mb="xs">
								<Text fw={500}>{instrument.name}</Text>
								<Badge color="pink">Nuevo</Badge>
							</Group>

							<ScrollArea mih={40} mah={100}>
								<Text size="sm" c="dimmed">
									{instrument.description}
								</Text>
							</ScrollArea>
						</Box>

						<Button color="blue" fullWidth radius="md" mih={34}>
							{instrument.price}€
						</Button>
					</Card>
				</Grid.Col>
			))}
		</Grid>
	)
}
