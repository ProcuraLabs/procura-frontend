import { useId, useState, type ReactNode } from 'react'

export interface TabItem {
  id: string
  label: ReactNode
  content: ReactNode
  disabled?: boolean
}

export interface TabsProps {
  tabs: readonly TabItem[]
  defaultTabId?: string
  'aria-label': string
}

/** An arrow-key navigable tab list with associated tab panels. */
export function Tabs({ tabs, defaultTabId, 'aria-label': ariaLabel }: TabsProps) {
  const initialTab = tabs.find((tab) => tab.id === defaultTabId && !tab.disabled) ?? tabs.find((tab) => !tab.disabled)
  const [activeId, setActiveId] = useState(initialTab?.id)
  const baseId = useId()
  const activeTab = tabs.find((tab) => tab.id === activeId)

  const selectRelativeTab = (currentId: string, direction: 1 | -1) => {
    const enabledTabs = tabs.filter((tab) => !tab.disabled)
    if (enabledTabs.length === 0) return
    const currentIndex = enabledTabs.findIndex((tab) => tab.id === currentId)
    const next = enabledTabs[(currentIndex + direction + enabledTabs.length) % enabledTabs.length]
    setActiveId(next.id)
    document.getElementById(`${baseId}-${next.id}-tab`)?.focus()
  }

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist" aria-label={ariaLabel}>
        {tabs.map((tab) => {
          const selected = tab.id === activeId
          return (
            <button
              key={tab.id}
              id={`${baseId}-${tab.id}-tab`}
              className="tabs__tab"
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-${tab.id}-panel`}
              tabIndex={selected ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight') { event.preventDefault(); selectRelativeTab(tab.id, 1) }
                if (event.key === 'ArrowLeft') { event.preventDefault(); selectRelativeTab(tab.id, -1) }
                if (event.key === 'Home') { event.preventDefault(); document.getElementById(`${baseId}-${tabs.find((item) => !item.disabled)?.id}-tab`)?.focus() }
                if (event.key === 'End') { event.preventDefault(); const enabled = tabs.filter((item) => !item.disabled); document.getElementById(`${baseId}-${enabled[enabled.length - 1]?.id}-tab`)?.focus() }
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      {activeTab ? <div id={`${baseId}-${activeTab.id}-panel`} className="tabs__panel" role="tabpanel" aria-labelledby={`${baseId}-${activeTab.id}-tab`}>{activeTab.content}</div> : null}
    </div>
  )
}
