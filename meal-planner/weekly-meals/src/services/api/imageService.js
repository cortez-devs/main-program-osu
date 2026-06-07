const IMAGE_API = "http://localhost:3000";

export async function uploadImage(file) {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${IMAGE_API}/upload`, {
        method: "POST",
        body: formData
    });

    if (!res.ok) {
        throw new Error("Image upload failed");
    }

    const data = await res.json();

    return {
        id:data.id,
        url: `${IMAGE_API}/images/${data.id}`
    };
}

export async function deleteImage(id) {
    const res = await fetch(`${IMAGE_API}/image/${id}`,{
        method: "DELETE"
    });

    if (!res.ok) {
        throw new Error("Failed to delete image");
    }

    return true
}