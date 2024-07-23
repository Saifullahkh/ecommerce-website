import React from 'react'
import { FaSignInAlt } from "react-icons/fa";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

function Login() {
  return (
    <>
      {/* <!-- Button trigger modal --> */}
        <button type="button" class="btn  btn-md text-white" data-bs-toggle="modal" data-bs-target="#loginModal">
             <span className='me-1 fs-5 btn-sm text-white'> <FaSignInAlt /></span>
              Login
        </button>

        {/* <!-- Modal --> */}
        <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Login</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <button className="btn btn-primary w-100 mb-4">
                            <span className='me-2'><FaGoogle /></span>
                            Sign in With Google
                        </button>
                        <button className="btn btn-primary w-100 mb-4">
                            <span className='me-2'><FaFacebookF /></span>
                            Sign in With Facebook
                        </button>
                        <form>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" />
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">Check me out</label>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login
