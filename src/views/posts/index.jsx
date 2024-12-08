import { useState, useEffect } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

export default function PostIndex() {
	// State untuk menyimpan data posts
	const [posts, setPosts] = useState([]);

	// Fungsi untuk mengambil data dari API Laravel
	const fetchDataPosts = async () => {
		try {
			const response = await api.get("/api/posts");
			setPosts(response.data.data); // Assign data dari API ke state
		} catch (error) {
			console.error("Error fetching posts:", error);
		}
	};

	// Fungsi untuk menghapus post
	const handleDelete = async (id) => {
		// Konfirmasi sebelum menghapus
		if (window.confirm("Are you sure you want to delete this post?")) {
			try {
				// Kirim request DELETE ke API
				await api.delete(`/api/posts/${id}`);

				// Hapus post dari state
				setPosts(posts.filter((post) => post.id !== id));

				alert("Post deleted successfully!");
			} catch (error) {
				console.error("Error deleting post:", error);
				alert("Failed to delete post.");
			}
		}
	};

	// UseEffect untuk menjalankan fetchDataPosts saat komponen dimuat
	useEffect(() => {
		fetchDataPosts();
	}, []);

	return (
		<div className="container mt-5 mb-5">
			<div className="row">
				<div className="col-md-12">
					<Link
						to="/posts/create"
						className="btn btn-md btn-success rounded shadow border-0 mb-3"
					>
						ADD NEW POST
					</Link>
					<div className="card border-0 rounded shadow">
						<div className="card-body">
							<table className="table table-bordered">
								<thead className="bg-dark text-white">
									<tr>
										<th scope="col">Judul</th>
										<th scope="col">Isi</th>
										<th scope="col">Tanggal</th>
										<th scope="col">Penulis</th>
										<th scope="col" style={{ width: "15%" }}>
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{posts.length > 0 ? (
										posts.map((post) => (
											<tr key={post.id}>
												<td>{post.judul}</td>
												<td>{post.isi}</td>
												<td>{post.tanggal}</td>
												<td>{post.penulis}</td>
												<td className="text-center">
													<Link
														to={`/posts/edit/${post.id}`}
														className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"
													>
														EDIT
													</Link>
													<button
														onClick={() => handleDelete(post.id)}
														className="btn btn-sm btn-danger rounded-sm shadow border-0"
													>
														DELETE
													</button>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan="5" className="text-center">
												<div className="alert alert-danger mb-0">
													Data Belum Tersedia!
												</div>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
