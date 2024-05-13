import { API_URL } from "@/auth/url";

export async function fetchAllTasks(id: string | undefined) {
    try {
        const response = await fetch(`${API_URL}/task/get/${id}`);
        if (!response.ok) {
            throw new Error(`Error fetching products: ${response.statusText}`);
        }
        return response;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

export async function changeTaskState(taskId: string | undefined, state: string) {
    if (!taskId) {
        throw new Error("Task ID is required");
    }

    try {
        const response = await fetch(`${API_URL}/task/put/${taskId}/${state}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        console.log(response);

        if (!response.ok) {
            throw new Error(`Error updating task: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
}


export async function postTask(id: string | undefined, title: string, content: string) {
    try {
        const response = await fetch(`${API_URL}/task/post/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                content,
            }),
        });

        console.log(response);
        
        if (!response.ok) {
            throw new Error(`Error updating task: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error("Error submitting form:", error);
        throw error;
    }
}



export async function editTask(id: string | undefined, title: string, content: string) {
    try {
        const response = await fetch(`${API_URL}/task/put/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                content,
            }),
        });

        console.log(response);
        
        if (!response.ok) {
            throw new Error(`Error updating task: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error("Error submitting form:", error);
        throw error;
    }
}




export async function deleteTask(id: string) {
    try {
        const response = await fetch(`${API_URL}/task/del/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(response);
        
        if (!response.ok) {
            throw new Error(`Error updating task: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error("Error submitting form:", error);
        throw error;
    }
}