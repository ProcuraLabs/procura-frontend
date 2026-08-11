import { Route, Routes } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import PagePlaceholder from '../components/common/PagePlaceholder'

/**
 * Route tree for the application shell. Every route renders inside
 * {@link AppLayout} so it shares the header, navigation and footer.
 *
 * Content is placeholder-only for now — the shell must simply accommodate the
 * landing page, organization dashboard, procurement and vendor workflows, and
 * transaction views. Real pages arrive in later steps.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          index
          element={
            <PagePlaceholder
              title="Procura"
              description="Decentralized procurement & milestone payments on Stellar."
            />
          }
        />
        <Route
          path="dashboard"
          element={
            <PagePlaceholder
              title="Organization dashboard"
              description="Overview of your organization's procurement activity."
            />
          }
        />
        <Route
          path="procurement"
          element={
            <PagePlaceholder
              title="Procurement"
              description="Create and manage procurement requests and their milestones."
            />
          }
        />
        <Route
          path="vendors"
          element={
            <PagePlaceholder
              title="Vendors"
              description="Discover vendors and manage proposals and awards."
            />
          }
        />
        <Route
          path="transactions"
          element={
            <PagePlaceholder
              title="Transactions"
              description="On-chain escrow, milestone releases and payment history."
            />
          }
        />
        <Route
          path="*"
          element={
            <PagePlaceholder
              title="Page not found"
              description="The page you're looking for doesn't exist."
            />
          }
        />
      </Route>
    </Routes>
  )
}
