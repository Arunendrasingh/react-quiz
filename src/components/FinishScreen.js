function FinishScreen({point, maxPoint}) {
    return (
        <p className="result">
            You Scored <strong>{point}</strong> out of {maxPoint}
        </p>
    )
}

export default FinishScreen
