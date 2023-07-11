import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ErrorType, FormProps, FormValue } from "./form.props";
import { useRouter } from "next/router";

function Form({ onSubmit, sectionTitle, values }: FormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);
  const [formValue, setFormValue] = useState<FormValue>({
    title: "",
    description: "",
    excerpt: "",
  });

  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const submitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await onSubmit(formValue);
      console.log(response);
      router.push("/");
    } catch (error) {
      const result = error as ErrorType;
      setLoading(false);
      if (result.response.data.message) {
        setError(result.response.data.message);
      } else {
        setError([result.message]);
      }
      setTimeout(() => {
        setError([]);
      }, 2000);
    }
  };

  const removeErrorItem = (item: string) => {
    setError(error.filter((err) => err !== item));
  };

  useEffect(() => {
    setFormValue({
      title: values?.title,
      excerpt: values?.excerpt,
      description: values?.description,
    });

    //
  }, [router.query.slug]);
  return (
    <div className="row">
      <div className="col-md-6 offset-md-2">
        {error.length > 0
          ? error.map((item) => (
              <div
                className="alert alert-danger alert-dismissible fade show"
                key={item}
              >
                <div>{item}</div>
                <button
                  className="btn-close"
                  data-bs-dismis="alert"
                  arial-label="Close"
                  onClick={() => removeErrorItem(item)}
                />
              </div>
            ))
          : ""}

        <form onSubmit={submitHandle}>
          <h1 className="h3 mb-3 fw-normal">{sectionTitle}</h1>

          <div className="form-floating mt-2">
            <input
              type="text"
              name="title"
              className="form-control"
              id="floatingInput"
              placeholder="Title"
              value={formValue.title}
              onChange={handleChange}
            />
            <label htmlFor="floatingInput">Title</label>
          </div>
          <div className="form-floating mt-2">
            <input
              type="text"
              name="excerpt"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={formValue.excerpt}
              onChange={handleChange}
            />
            <label htmlFor="floatingPassword">Excerpt</label>
          </div>
          <div className="form-floating mt-2">
            <textarea
              name="description"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              style={{ height: "100px" }}
              value={formValue.description}
              onChange={handleChange}
            />
            <label htmlFor="floatingPassword">Description</label>
          </div>

          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          <button
            disabled={loading}
            className="btn btn-primary w-100 py-2"
            type="submit"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
