export interface SymptomLog {
    id?: number;         // Optional since it will be automatically generated by the database
    user_id: number;
    symptom_id: number;
    log_time: string;    // Use ISO string format for date-time
    severity: number;
    name?: string;       // Optional if you are including symptom name in your API responses
    f_name?: string;     // Optional if you are including user's first name in your API responses
    l_name?: string;     // Optional if you are including user's last name in your API responses
  }
  