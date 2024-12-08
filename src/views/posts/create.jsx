import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function PostCreate() {
	// State untuk input form
	const [judul, setJudul] = useState("");
	const [isi, setIsi] = useState("");
	const [tanggal, setTanggal] = useState("");
	const [penulis, setPenulis] = useState("");

	// State untuk error handling
	const [errors, setErrors] = useState({});

	// Navigasi setelah berhasil menyimpan data
	const navigate = useNavigate();

	// Method untuk menyimpan data
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Siapkan data yang akan dikirim
		const postData = {
			judul,
			isi,
			tanggal,
			penulis,
		};

		try {
			// Kirim data ke API
			const response = await api.post("/api/posts", postData);

			console.log("Success:", response.data);

			// Redirect ke halaman index setelah berhasil
			navigate("/posts");
		} catch (error) {
			console.error("Error:", error.response?.data || error.message);

			// Tampilkan error jika ada
			if (error.response?.data?.errors) {
				setErrors(error.response.data.errors);
			}
		}
	};

	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-md-12">
					<div className="card border-0 rounded shadow">
						<div className="card-body">
							<h4 className="mb-4">Create New Post</h4>
							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<label className="form-label fw-bold">Judul</label>
									<input
										type="text"
										className={`form-control ${
											errors.judul ? "is-invalid" : ""
										}`}
										value={judul}
										onChange={(e) => setJudul(e.target.value)}
										placeholder="Masukkan judul"
									/>
									{errors.judul && (
										<div className="invalid-feedback">{errors.judul[0]}</div>
									)}
								</div>

								<div className="mb-3">
									<label className="form-label fw-bold">Isi</label>
									<textarea
										className={`form-control ${errors.isi ? "is-invalid" : ""}`}
										value={isi}
										onChange={(e) => setIsi(e.target.value)}
										rows="5"
										placeholder="Masukkan isi konten"
									></textarea>
									{errors.isi && (
										<div className="invalid-feedback">{errors.isi[0]}</div>
									)}
								</div>

								<div className="mb-3">
									<label className="form-label fw-bold">Tanggal</label>
									<input
										type="date"
										className={`form-control ${
											errors.tanggal ? "is-invalid" : ""
										}`}
										value={tanggal}
										onChange={(e) => setTanggal(e.target.value)}
									/>
									{errors.tanggal && (
										<div className="invalid-feedback">{errors.tanggal[0]}</div>
									)}
								</div>

								<div className="mb-3">
									<label className="form-label fw-bold">Penulis</label>
									<input
										type="text"
										className={`form-control ${
											errors.penulis ? "is-invalid" : ""
										}`}
										value={penulis}
										onChange={(e) => setPenulis(e.target.value)}
										placeholder="Masukkan nama penulis"
									/>
									{errors.penulis && (
										<div className="invalid-feedback">{errors.penulis[0]}</div>
									)}
								</div>

								<button
									type="submit"
									className="btn btn-md btn-primary rounded-sm shadow border-0"
								>
									Save
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
