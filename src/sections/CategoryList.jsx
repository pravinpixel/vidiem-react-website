
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';
import PerfectScrollbar from 'react-perfect-scrollbar'

const scrollbarOptions = {
    wheelSpeed: 0.5,
    wheelPropagation: false,
}
function CategoryList({ loading, category, selected, changeHandler }) {

    return (
        <PerfectScrollbar
            options={scrollbarOptions}
            className="category-scroll">
            {loading ? (null) : category && category.length ? (
                category.map((cat, index) => (
                    <article
                        key={index}
                        onClick={(e) => changeHandler(e, cat.type_id, "grinding_type")}
                        className={selected === cat.type_id ? "current" : ""}>
                        <div className={selected === cat.type_id ? "jar-item selected" : "jar-item"}>
                            <img src={cat.basepath} alt="category" />
                            {selected === cat.type_id ? (<span className="right">
                                <CheckBoxSharpIcon sx={{ color: "#E31E24" }} />
                            </span>) : null}
                        </div>
                        <h5>{cat.type_title}</h5>
                    </article>))
            ) : null}
        </PerfectScrollbar>
    );
}

export default CategoryList;
