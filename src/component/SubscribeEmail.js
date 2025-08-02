import React from 'react';
import '../App.css'

function SubscribeEmail() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted');
  };

  return (
   <div className='subscribe'>
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10 ">
                    <div className="card border-0 p-4 p-md-5 bg-transparent text-white">
                        <div className="card-body text-center">
                            <h2 className="mb-4 fw-bold">NewsLetter Updates</h2>
                            <p className="mb-4 text-white">
                                Subscribe to receive emails on new product arrivals &<br />special offers
                            </p>
                            
                            <form 
                                className="row g-3 justify-content-center" 
                                onSubmit={handleSubmit}
                            >
                                <div className="col-md-8">
                                    <label htmlFor="emailInput" className="visually-hidden">
                                        Email address
                                    </label>
                                    <input 
                                        type="email" 
                                        className="form-control form-control-lg " 
                                        id="emailInput" 
                                        placeholder="Email address"
                                        required
                                    />
                                </div>
                                <div className="col-md-3">
                                    <button 
                                        type="submit" 
                                        className="btn btn1 btn-lg "
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         </div>
   </div>
  );
}

export default SubscribeEmail;