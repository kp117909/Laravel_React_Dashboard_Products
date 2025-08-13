import { Button } from '@/components/ui/button';
import { Grid, List } from 'lucide-react';

export type ViewMode = 'grid-3' | 'list';

interface ViewSwitcherProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  const views = [

    {
      mode: 'grid-3' as ViewMode,
      icon: Grid,
      label: '3 Columns',
      className: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'
    },
    {
      mode: 'list' as ViewMode,
      icon: List,
      label: 'List',
      className: 'grid-cols-1'
    }
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
      {views.map((view) => {
        const Icon = view.icon;
        const isActive = currentView === view.mode;

        return (
          <Button
            key={view.mode}
            variant={isActive ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange(view.mode)}
            className="h-8 w-8 p-0"
            title={view.label}
          >
            <Icon className="h-4 w-4" />
          </Button>
        );
      })}
    </div>
  );
}
