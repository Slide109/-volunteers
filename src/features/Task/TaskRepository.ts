import tasksQuery from '../../graphql/tasks.graphql';
import taskQuery from '../../graphql/task.graphql';
import taskCreateMutation from '../../graphql/task_create.graphql';
import taskAssignMutation from '../../graphql/task_assign.graphql';
import assignedTasksQuery from '../../graphql/assigned_tasks.graphql';
import updateTaskStatusMutation from '../../graphql/update_task_status.graphql';
import { Repository } from '~/abstracts/Repository';
import { GQLTask, GQLTaskInput, GQLTaskStatus } from '~/types/gql';

class TaskRepository extends Repository {
    public getTasks = async ({ userID }): Promise<GQLTask[]> => {
        const { data } = await this.apollo.client.query({
            query: tasksQuery,
            variables: {
                userID,
            },
        });

        return data;
    };

    public getTaskById = async (id: string): Promise<GQLTask> => {
        const { data } = await this.apollo.client.query({
            query: taskQuery,
            variables: {
                id,
            },
        });

        return data?.task;
    };

    public getAllAssignedTasks = async (): Promise<GQLTask[]> => {
        const { data } = await this.apollo.client.query({
            query: assignedTasksQuery,
        });

        return data?.assignedTasks || [];
    };

    public getAvailableTasks = async (): Promise<GQLTask[]> => {
        const { data } = await this.apollo.client.query({
            query: tasksQuery,
            variables: {
                status: ['New'],
            },
        });

        return data?.tasks || [];
    };

    public getUserTasks = async (): Promise<GQLTask[]> => {
        return [];
    };

    public createTask = async ({ title, description, coordinates }: GQLTaskInput): Promise<boolean> => {
        const { data } = await this.apollo.client.mutate({
            mutation: taskCreateMutation,
            variables: {
                title,
                description,
                coordinates,
            },
        });

        return Boolean(data.taskCreate?.id.length);
    };

    public assignTask = async (taskID: string): Promise<boolean> => {
        const { data } = await this.apollo.client.mutate({
            mutation: taskAssignMutation,
            variables: {
                taskID,
            },
        });

        return data.assignTask;
    };

    public userActiveTasks = async (userID: string): Promise<GQLTask[]> => {
        const { data } = await this.apollo.client.query({
            query: tasksQuery,
            variables: {
                user: userID,
                status: [GQLTaskStatus.New, GQLTaskStatus.Assigned],
            },
        });

        return data?.tasks || [];
    };

    public userHistoryTasks = async (userID: string): Promise<GQLTask[]> => {
        const { data } = await this.apollo.client.query({
            query: tasksQuery,
            variables: {
                user: userID,
                status: [GQLTaskStatus.Completed, GQLTaskStatus.Cancelled],
            },
        });

        return data?.tasks || [];
    };

    public volunteerHistoryTasks = async (assigneeID: string): Promise<GQLTask[]> => {
        const { data } = await this.apollo.client.query({
            query: tasksQuery,
            variables: {
                assignee: assigneeID,
                status: [GQLTaskStatus.Completed, GQLTaskStatus.Cancelled],
            },
        });

        return data?.tasks || [];
    };

    public cancelTask = async (taskID: string): Promise<boolean> => {
        const { data } = await this.apollo.client.query({
            query: updateTaskStatusMutation,
            variables: {
                taskID,
                status: GQLTaskStatus.Cancelled,
            },
        });
        console.log({ data });
        return data?.updateTaskStatus || false;
    };

    public completeTask = async (taskID: string): Promise<boolean> => {
        const { data } = await this.apollo.client.query({
            query: updateTaskStatusMutation,
            variables: {
                taskID,
                status: GQLTaskStatus.Completed,
            },
        });

        return data?.updateTaskStatus || false;
    };
}

export { TaskRepository };
