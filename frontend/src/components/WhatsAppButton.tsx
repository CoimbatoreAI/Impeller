import React from "react";

/**
 * A standard floating WhatsApp button.
 * Uses the exact official brand SVG for maximum recognition and fidelity.
 */
const WhatsAppButton = () => {
    const phoneNumber = "919360293967";
    const message = encodeURIComponent("Hello! I'm interested in your textiles.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-28 right-6 z-[60] group animate-fade-in"
            aria-label="Contact us on WhatsApp"
        >
            <div className="relative">
                {/* Visual pulse indicator */}
                <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 scale-110"></div>

                {/* Official WhatsApp Button */}
                <div className="relative bg-[#25D366] hover:bg-[#128C7E] w-14 h-14 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.3)] flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-active:scale-95">
                    {/* Official WhatsApp Icon SVG */}
                    <svg
                        viewBox="0 0 24 24"
                        width="34"
                        height="34"
                        fill="white"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 4.754a9.624 9.624 0 01-4.881-1.325l-.35-.208-3.633.953.97-3.543-.228-.362a9.61 9.61 0 01-1.466-5.063c0-5.322 4.33-9.652 9.655-9.652 2.58 0 5.006 1.004 6.828 2.827a9.58 9.58 0 012.822 6.825c0 5.324-4.331 9.655-9.655 9.655M24 12c0-6.623-5.377-12-12-12S0 5.377 0 12c0 2.112.545 4.098 1.5 5.833L0 24l6.32-.1.01-.01c1.7.9 3.6 1.4 5.6 1.4 6.6 0 12-5.4 12-12z" />
                    </svg>
                </div>
            </div>
        </a>
    );
};

export default WhatsAppButton;
