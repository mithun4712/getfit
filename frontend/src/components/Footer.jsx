import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFacebook, FiTwitter, FiYoutube, FiMail } from 'react-icons/fi';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'Facebook', icon: <FiFacebook size={20} />, url: 'https://facebook.com' },
        { name: 'Twitter', icon: <FiTwitter size={20} />, url: 'https://twitter.com' },
        { name: 'YouTube', icon: <FiYoutube size={20} />, url: 'https://youtube.com' },
    ];

    const supportLinks = [
        { name: 'Help Center', url: '/help' },
        { name: 'Contact Us', url: '/contact' },
        { name: 'FAQs', url: '/faq' },
        { name: 'Community', url: '/community' },
    ];

    const legalLinks = [
        { name: 'Privacy Policy', url: '/privacy' },
        { name: 'Terms of Service', url: '/terms' },
        { name: 'Cookie Policy', url: '/cookies' },
        { name: 'Disclaimer', url: '/disclaimer' },
    ];

    return (
        <footer className="bg-base-200 border-t border-base-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1: Logo and Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">GF</span>
                            </div>
                            <span className="text-2xl font-bold font-display text-gradient">GetFit</span>
                        </Link>
                        <p className="text-base-content/70 text-sm leading-relaxed">
                            Your ultimate fitness companion for tracking calories, workouts, and achieving your health goals.
                            Transform your lifestyle with AI-powered insights and personalized recommendations.
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-base-content/60">
                            <FiMail size={16} />
                            <span>support@getfit.com</span>
                        </div>
                    </motion.div>

                    {/* Column 2: Support Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-semibold font-display">Support</h3>
                        <ul className="space-y-3">
                            {supportLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.url}
                                        className="text-base-content/70 hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                                            {link.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 3: Legal Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-semibold font-display">Legal</h3>
                        <ul className="space-y-3">
                            {legalLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.url}
                                        className="text-base-content/70 hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                                            {link.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 4: Social Media */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-semibold font-display">Connect With Us</h3>
                        <p className="text-base-content/70 text-sm">
                            Follow us on social media for fitness tips, updates, and community support.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 bg-base-300 hover:bg-primary hover:text-primary-content rounded-lg flex items-center justify-center transition-all duration-300 group"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>

                        {/* Newsletter Signup */}
                        <div className="pt-4">
                            <p className="text-sm font-medium mb-2">Stay Updated</p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="input input-bordered input-sm flex-1 rounded-r-none focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button className="btn btn-primary btn-sm rounded-l-none">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-12 pt-8 border-t border-base-300"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-base-content/60 text-sm">
                            © {currentYear} GetFit. All rights reserved. Built with ❤️ for fitness enthusiasts.
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-base-content/60">
                            <Link to="/sitemap" className="hover:text-primary transition-colors">
                                Sitemap
                            </Link>
                            <Link to="/accessibility" className="hover:text-primary transition-colors">
                                Accessibility
                            </Link>
                            <Link to="/careers" className="hover:text-primary transition-colors">
                                Careers
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
