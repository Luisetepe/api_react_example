import { AddInstrumentPage } from '@api/actions/instruments/add/AddInstrumentPage'
import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout/MainLayout'
import { AnalyticsPage } from './pages/analytics/AnalyticsPage'
import { InstrumentsListPage } from './pages/instruments/InstrumentsListPage'
import { SettingsPage } from './pages/settings/SettingsPage'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: 'instruments',
				element: <InstrumentsListPage />
			},
			{
				path: 'instruments/add',
				element: <AddInstrumentPage />
			},
			{
				path: 'analytics',
				element: <AnalyticsPage />
			},
			{
				path: 'settings',
				element: <SettingsPage />
			}
		]
	}
])
