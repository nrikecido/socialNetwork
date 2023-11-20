
const Reset = () => {
    return<>
    <section className="h-100">
		<div className="container h-100">
			<div className="row justify-content-sm-center h-100">
				<div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
					<div className="text-center my-5 logo-musin">
						<h1>musIN</h1>
					</div>
					<div className="card shadow-lg">
						<div className="card-body p-5">
							<h1 className="fs-4 card-title fw-bold mb-4 text-center">RESET PASSWORD</h1>
							<form method="POST" className="needs-validation" novalidate="" autocomplete="off">
								<div className="mb-3">
									<label className="mb-2 text-muted" for="password">Nueva Password</label>
									<input id="password" type="password" className="form-control" name="password" value="" required autofocus />
									<div className="invalid-feedback">
										Password is required	
									</div>
								</div>

								<div className="mb-3">
									<label className="mb-2 text-muted" for="password-confirm">Confirma Password</label>
									<input id="password-confirm" type="password" className="form-control" name="password_confirm" required />
								    <div className="invalid-feedback">
										Please confirm your new password
							    	</div>
								</div>

								<div className="d-flex align-items-center">
									<button type="submit" className="btn btn-primary ms-auto">
										Reset Password	
									</button>
								</div>
							</form>
						</div>
					</div>
					<div className="text-center mt-5 text-muted">
						Copyright 2023 Mi Compañía 
					</div>
				</div>
			</div>
		</div>
	</section>
    
    </>
}

export default Reset;