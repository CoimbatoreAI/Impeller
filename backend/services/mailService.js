const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const mailService = {
    sendWelcomeEmail: async (userEmail) => {
        const mailOptions = {
            from: `"Impeller Fabrics" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: 'Welcome to Impeller Fabrics!',
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #1a1a1a; margin-top: 0;">Welcome to Impeller Fabrics!</h1>
                        <p style="color: #666; font-size: 16px;">Crafted by Tradition · Designed for Tomorrow</p>
                    </div>
                    <div style="color: #333; line-height: 1.6;">
                        <p>Hello,</p>
                        <p>Thank you for joining the Impeller Fabrics community! We are excited to have you with us.</p>
                        <p>At Impeller, we blend three decades of textile heritage with contemporary style. Our mission is to provide you with the finest fabrics and garments that honor tradition while embracing the future.</p>
                        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin: 30px 0;">
                            <h3 style="margin-top: 0; color: #1a1a1a;">What's next?</h3>
                            <ul style="padding-left: 20px;">
                                <li>Explore our latest collections</li>
                                <li>Save your favorites to your wishlist</li>
                                <li>Enjoy seamless shopping experience</li>
                            </ul>
                        </div>
                        <p>If you have any questions or need assistance, our support team is always here for you.</p>
                        <p style="margin-top: 40px;">Best regards,<br>The Impeller Fabrics Team</p>
                    </div>
                    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
                        <p>&copy; ${new Date().getFullYear()} Impeller Fabrics. All rights reserved.</p>
                    </div>
                </div>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Welcome email sent to:', userEmail);
        } catch (error) {
            console.error('Error sending welcome email:', error);
        }
    },

    sendOrderConfirmation: async (order) => {
        const { customerDetails, products, totalAmount, orderNumber } = order;

        const productRows = products.map(item => `
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.name}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price.toLocaleString()}</td>
            </tr>
        `).join('');

        const customerMailOptions = {
            from: `"Impeller Fabrics" <${process.env.EMAIL_USER}>`,
            to: customerDetails.email,
            subject: `Order Confirmation - ${orderNumber}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #1a1a1a; margin-top: 0;">Order Received!</h1>
                        <p style="color: #666; font-size: 16px;">Thank you for your purchase, ${customerDetails.name}.</p>
                    </div>
                    <div style="color: #333;">
                        <p>Your order <strong>${orderNumber}</strong> has been successfully placed. We are processing it and will notify you once it ships.</p>
                        
                        <h3 style="margin-top: 30px; border-bottom: 2px solid #eee; padding-bottom: 10px;">Order Summary</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="background-color: #f9f9f9;">
                                    <th style="padding: 12px; text-align: left;">Product</th>
                                    <th style="padding: 12px; text-align: center;">Qty</th>
                                    <th style="padding: 12px; text-align: right;">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${productRows}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="2" style="padding: 20px 12px 12px; text-align: right; font-weight: bold;">Total Amount</td>
                                    <td style="padding: 20px 12px 12px; text-align: right; font-weight: bold; color: #f59e0b; font-size: 18px;">₹${totalAmount.toLocaleString()}</td>
                                </tr>
                            </tfoot>
                        </table>

                        <div style="margin-top: 30px; background-color: #f9f9f9; padding: 20px; border-radius: 6px;">
                            <h4 style="margin-top: 0;">Shipping Address:</h4>
                            <p style="margin-bottom: 0; color: #666;">${customerDetails.address}</p>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
                        <p>&copy; ${new Date().getFullYear()} Impeller Fabrics. All rights reserved.</p>
                    </div>
                </div>
            `
        };

        const adminMailOptions = {
            from: `"Impeller Fabrics Orders" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `New Order Request - ${orderNumber}`,
            html: `
                <div style="font-family: sans-serif; font-size: 14px; color: #333;">
                    <h2>New Order Alert</h2>
                    <p>A new order has been placed on the website.</p>
                    <p><strong>Order Number:</strong> ${orderNumber}</p>
                    <p><strong>Customer Name:</strong> ${customerDetails.name}</p>
                    <p><strong>Customer Email:</strong> ${customerDetails.email}</p>
                    <p><strong>Customer Phone:</strong> ${customerDetails.phone}</p>
                    <hr>
                    <h3>Products:</h3>
                    <ul>
                        ${products.map(p => `<li>${p.name} x ${p.quantity} - ₹${p.price.toLocaleString()}</li>`).join('')}
                    </ul>
                    <p><strong>Total Amount:</strong> ₹${totalAmount.toLocaleString()}</p>
                    <p><strong>Shipping Address:</strong><br>${customerDetails.address}</p>
                </div>
            `
        };

        try {
            await Promise.all([
                transporter.sendMail(customerMailOptions),
                transporter.sendMail(adminMailOptions)
            ]);
            console.log(`Order emails sent for order ${orderNumber}`);
        } catch (error) {
            console.error('Error sending order emails:', error);
        }
    }
};

module.exports = mailService;
