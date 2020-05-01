import { GQLTask } from '~/types/gql';

export interface DashboardTasksListProps {
    tasks: GQLTask[];
    header: string;
}
