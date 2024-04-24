'use server';
 
export async function createInvoice(formData: FormData) {
    const rawFormData = {
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
      };
      // Test it out:
      console.log(rawFormData);
}

export async function createTicket(formData: FormData) {
    const rawFormData = {
        siteId: formData.get('siteId'),
        ticketNumber: formData.get('ticketNumber'),
        issue: formData.get('description'),
        images: formData.get('images'),
        notificationEmail: formData.get('email'),
        status: formData.get('status'),
      };
      // Test it out:
      console.log(rawFormData);
}