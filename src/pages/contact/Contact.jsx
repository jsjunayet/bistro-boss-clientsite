

const Contact = () => {
    return (
        <div>
            <div className="App min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md mx-auto my-8 p-6 bg-white shadow-md rounded-md">
                    <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
                    <p className="text-gray-600 mb-6">
                        Feel free to reach out to us. Your opinions matter!
                    </p>
                    <p className="text-gray-600 mb-6">
                        Company Address: 123 ABS Street, Uni 21, Bangladesh
                    </p>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Your email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Your message"
                                rows="4"

                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;