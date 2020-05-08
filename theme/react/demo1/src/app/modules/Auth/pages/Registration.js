import React, {useState} from "react";
import {Formik, Field} from "formik";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {FormattedMessage, injectIntl} from "react-intl";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {Input} from "../../../../_metronic/_partials/controls";
import * as auth from "../_redux/authRedux";
import {register} from "../_redux/authCrud";

function Registration(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (meta, fieldname) => {
    let result = "form-control form-control-solid h-auto py-5 px-6 ";
    if (meta.touched && meta.error) {
      result += " is-invalid"
    }

    if (meta.touched && !meta.error) {
      result += " is-valid"
    }

    return result;
  }


  return (
      <div className="login-form">
        <div className="text-center mb-10 mb-lg-20">
          <h3 className="font-size-h1">
            <FormattedMessage id="AUTH.REGISTER.TITLE" />
          </h3>
          <p className="text-muted font-weight-bold">Enter your details to create your account</p>
        </div>

        <Formik
          initialValues={{
            email: "",
            fullname: "",
            username: "",
            password: "",
            acceptTerms: true,
            confirmPassword: ""
          }}
          validate={values => {
            const errors = {};

            if (!values.email) {
              errors.email = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = intl.formatMessage({
                id: "AUTH.VALIDATION.INVALID_FIELD"
              });
            }

            if (!values.fullname) {
              errors.fullname = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.username) {
              errors.username = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.password) {
              errors.password = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.confirmPassword) {
              errors.confirmPassword = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            } else if (values.password !== values.confirmPassword) {
              errors.confirmPassword =
                "Password and Confirm Password didn't match.";
            }

            if (!values.acceptTerms) {
              errors.acceptTerms = "Accept Terms";
            }

            return errors;
          }}
          onSubmit={(values, { setStatus, setSubmitting }) => {
            enableLoading();
            register(
              values.email,
              values.fullname,
              values.username,
              values.password
            )
              .then(({ data: { accessToken } }) => {
                props.register(accessToken);
                disableLoading();
              })
              .catch(() => {
                setSubmitting(false);
                setStatus(
                  intl.formatMessage({
                    id: "AUTH.VALIDATION.INVALID_LOGIN"
                  })
                );
                disableLoading();
              });
          }}
        >
          {({
            values,
            status,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
              className="form"
            >
              {status && (
                <div role="alert" className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                  <div className="alert-text font-weight-bold">{status}</div>
                </div>
              )}

              <div className="form-group">
                {/* <TextField
                  margin="normal"
                  label="Fullname"
                  className="form-control form-control-solid rounded"
                  name="fullname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullname}
                  helperText={touched.fullname && errors.fullname}
                  error={Boolean(touched.fullname && errors.fullname)}
                /> */}
                <Field
                  type="text"
                  name="fullname"
                  component={Input}
                >
                  {({ field, form, meta }) => (
                      <div>
                        <input
                            type="text" {...field}
                            className={`${getInputClasses(meta)}`}
                            placeholder="Enter Fullname"/>
                        {meta.touched &&
                        meta.error && <div className="error invalid-feedback">{meta.error}</div>}
                      </div>
                  )}
                </Field>
              </div>

              <div className="form-group">
                {/* <TextField
                  label="Email"
                  margin="normal"
                  className="form-control form-control-solid rounded"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  helperText={touched.email && errors.email}
                  error={Boolean(touched.email && errors.email)}
                /> */}
                <Field
                  type="email"
                  name="email"
                  component={Input}
                >
                  {({ field, form, meta }) => (
                      <div>
                        <input
                            type="email" {...field}
                            className={`${getInputClasses(meta)}`}
                            placeholder="Enter email"/>
                        {meta.touched &&
                        meta.error && <div className="error invalid-feedback">{meta.error}</div>}
                      </div>
                  )}
                </Field>
              </div>

              <div className="form-group">
                {/* <TextField
                  margin="normal"
                  label="Username"
                  className="form-control form-control-solid rounded"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  helperText={touched.username && errors.username}
                  error={Boolean(touched.username && errors.username)}
                /> */}
                <Field
                  type="text"
                  name="username"
                  component={Input}
                >
                  {({ field, form, meta }) => (
                      <div>
                        <input
                            type="text" {...field}
                            className={`${getInputClasses(meta)}`}
                            placeholder="Enter Username"/>
                        {meta.touched &&
                        meta.error && <div className="error invalid-feedback">{meta.error}</div>}
                      </div>
                  )}
                </Field>
              </div>

              <div className="form-group">
                {/* <TextField
                  type="password"
                  margin="normal"
                  label="Password"
                  className="form-control form-control-solid rounded"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  helperText={touched.password && errors.password}
                  error={Boolean(touched.password && errors.password)}
                /> */}
                <Field
                  type="password"
                  name="password"
                  component={Input}
                  placeholder="Password"
                  label="Password"
                >
                  {({ field, form, meta }) => (
                      <div>
                        <input
                            type="password" {...field}
                            className={`${getInputClasses(meta)}`}
                            placeholder="Enter Password"/>
                        {meta.touched &&
                        meta.error && <div className="error invalid-feedback">{meta.error}</div>}
                      </div>
                  )}
                </Field>
              </div>

              <div className="form-group">
                {/* <TextField
                  type="password"
                  margin="normal"
                  label="Confirm Password"
                  className="form-control form-control-solid rounded"
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                /> */}
                <Field
                  type="password"
                  name="confirmPassword"
                  component={Input}
                  placeholder="Confirm Password"
                  label="Confirm Password"
                >
                  {({ field, form, meta }) => (
                      <div>
                        <input
                            type="password" {...field}
                            className={`${getInputClasses(meta)}`}
                            placeholder="Confirm Password"/>
                        {meta.touched &&
                        meta.error && <div className="error invalid-feedback">{meta.error}</div>}
                      </div>
                  )}
                </Field>
              </div>

              <div className="form-group">
                <FormControlLabel
                  label={
                    <>
                      I agree the{" "}
                      <Link
                        to="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms & Conditions
                      </Link>.
                      <span />
                    </>
                  }
                  control={
                    <Checkbox
                      color="primary"
                      name="acceptTerms"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      checked={values.acceptTerms}
                    />
                  }
                />
              </div>

              <div className="form-group d-flex flex-wrap flex-center">
                <button
                    type="submit"
                    disabled={isSubmitting || !values.acceptTerms}
                    className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                >
                  <span className={`${loading ? "pr-3" : ""}`}>Submit</span>
                  {loading && (
                      <span className="spinner-border text-light"></span>
                  )}
                </button>


                <Link to="/auth/login">
                  <button
                    type="button"
                    className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
                  >
                    Cancel
                  </button>
                </Link>


              </div>
            </form>
          )}
        </Formik>
      </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Registration));
