const Spinner = () => {
    return (
        <div className="mt-5 d-flex justify-content-center align-items-center">
            <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;
