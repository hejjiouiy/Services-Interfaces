import React from 'react';

const Form = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
    };

    return (
        
        <form className='flex w-full bg-white rounded-xl p-4 justify-center items-center ' onSubmit={handleSubmit}>
            {/* Add form fields here */}
            <table>
                <tr>
                    <td>
                        <label htmlFor="name">Name:</label>
                    </td>
                    <td>
                        <input type="text" id="name" name="name" required />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="email">Email:</label>
                    </td>
                    <td>
                        <input type="email" id="email" name="email" required />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="message">Message:</label>
                    </td>
                    <td>
                        <textarea id="message" name="message" required></textarea>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="file">Upload File:</label>
                    </td>
                    <td>
                        <input type="file" id="file" name="file" required />
                    </td>
                </tr>
            </table>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;