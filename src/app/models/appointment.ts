export interface Appointment {
    user_id: any;
    id: number;
    carer_id: string;
    category: string;
    f_name: string; // First name of the appointment holder
    l_name: string; // Last name of the appointment holder
    scheduled_time: string; // Scheduled time for the appointment
    note?: string; // Optional note field for additional information
}
