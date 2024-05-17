import { Button, NumberInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import type { AddInstrumentRequest } from 'lib/models/requests/add-instrument.request'

export function AddInstrumentPage() {
	const form = useForm<AddInstrumentRequest>({
		mode: 'uncontrolled',
		initialValues: {
			name: '',
			description: '',
			price: 0,
			imageUrl:
				'https://www.sanganxa.com/31066-large_default/trompeta-yamaha-ytr-2330-l-lacada-en-sib.jpg'
		},
		validate: {
			name: (value) => (value.length < 1 ? 'Cannot be empty' : null),
			price: (value) => (!value || value < 0 ? '' : null)
		}
	})

	async function submit(formData: AddInstrumentRequest) {
		const response = await fetch('http://localhost:3000/api/instruments', {
			method: 'POST',
			body: JSON.stringify(formData),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		if (!response.ok) {
			console.log(response.json())
		}
	}
	return (
		<form onSubmit={form.onSubmit(submit, console.log)}>
			<TextInput
				label="Name"
				placeholder="Name"
				key={form.key('name')}
				{...form.getInputProps('name')}
			/>
			<TextInput
				label="Description"
				placeholder="Descripción"
				key={form.key('description')}
				{...form.getInputProps('description')}
			/>
			<NumberInput
				mt="sm"
				label="Price"
				placeholder="Precio"
				min={0}
				max={999999}
				key={form.key('price')}
				{...form.getInputProps('price')}
			/>
			<Button type="submit" mt="sm">
				Submit
			</Button>
		</form>
	)
}
