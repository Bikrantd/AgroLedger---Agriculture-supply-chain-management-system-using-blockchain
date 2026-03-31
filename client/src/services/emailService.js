import emailjs from '@emailjs/browser';

export const sendAdminOTP = async (email, otp) => {
    try {
        const expiryTime = new Date(Date.now() + 15 * 60000);
        const formattedTime = expiryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const templateParams = {
            email: email,  // ← This matches {{email}} in your template
            passcode: otp,
            time: formattedTime
        };

        const result = await emailjs.send(
            'service_41oxmjq',
            'template_ypu271f',
            templateParams,
            'yTsJIoBTI6CL8zAlr'
        );
        
        if (result.status === 200) {
            return { success: true, message: 'OTP sent to your email' };
        } else {
            return { success: false, message: 'Failed to send OTP' };
        }
    } catch (error) {
        console.error('Email error:', error);
        return { success: false, message: error.text || 'Network error. Please try again.' };
    }
};