class ServiceAPI {
    static baseURL = '/api/services';

    static async getAll() {
        try {
            const response = await fetch(this.baseURL);
            const data = await response.json();
            return data.data || [];
        } catch (error) {
            console.error('Error fetching services:', error);
            return [];
        }
    }

    static async create(serviceData) {
        const response = await fetch(this.baseURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(serviceData)
        });
        return await response.json();
    }

    static async update(id, serviceData) {
        const response = await fetch(`${this.baseURL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(serviceData)
        });
        return await response.json();
    }

    static async delete(id) {
        const response = await fetch(`${this.baseURL}/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    }
}