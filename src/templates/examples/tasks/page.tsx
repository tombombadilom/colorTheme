import  { useEffect, useState } from "react";
import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { UserNav } from "./components/user-nav";
import { taskSchema } from "./data/schema";
import data from "./data/tasks.json";

const TasksPage = () => {
	const [tasks, setTasks] = useState<
		{
			id: string;
			title: string;
			status: string;
			label: string;
			priority: string;
		}[]
	>([]);
	useEffect(() => {
		const getTasks = async () => {
			//const tasks = JSON.parse(data.toString());
			setTasks(z.array(taskSchema).parse(data));
		};
		getTasks();
	}, []);

	return tasks ? (
		<>
			<div className="md:hidden">
				<img
					src="/examples/tasks-light.png"
					width={1280}
					height={998}
					alt="Playground"
					className="block dark:hidden"
				/>
				<img
					src="/examples/tasks-dark.png"
					width={1280}
					height={998}
					alt="Playground"
					className="hidden dark:block"
				/>
			</div>
			<div className="hidden flex-col flex-1 p-8 space-y-8 h-full md:flex">
				<div className="flex justify-between items-center space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
						<p className="text-muted-foreground">
							Here&apos;s a list of your tasks for this month!
						</p>
					</div>
					<div className="flex items-center space-x-2">
						<UserNav />
					</div>
				</div>
				<DataTable data={tasks} columns={columns} />
			</div>
		</>
	) : (
		"loading ..."
	);
};

export default TasksPage;
