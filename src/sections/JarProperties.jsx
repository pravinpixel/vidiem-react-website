import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { useJarProperties } from 'store/hooks/WebHooks';
import _ from "lodash";
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';
import ContentLoader from "widgets/ContentLoader";
import PerfectScrollbar from 'react-perfect-scrollbar'

const scrollbarOptions = {
    wheelSpeed: 0.5,
    wheelPropagation: false,
}

function JarProperties(props) {
    const {
        current,
        grindingType,
        control,
        updatePropertyHandler
    } = props

    const {
        refetch: fetchJarProperties,
        data: jarPropertyList,
        isLoading: propertyLoader
    } = useJarProperties(grindingType)

    useEffect(() => {
        if (grindingType) {
            fetchJarProperties(grindingType)
        }
    }, [grindingType])

    return (
        <PerfectScrollbar
            options={scrollbarOptions}
            className="vi-content">
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                className="property-wrapper">
                {propertyLoader ? (<ContentLoader size={20} color="error" />) : (<>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <h5>Select Jar Shape</h5>
                        {jarPropertyList ? (
                            jarPropertyList?.data?.shape.length ? (
                                <Controller
                                    name="shape_id"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...field}
                                            name="shape-group"
                                            className="property-selector"
                                            onChange={(e) => updatePropertyHandler(e, "shape_id")}>
                                            {jarPropertyList?.data?.shape.map((shape, index) => (
                                                <FormControlLabel
                                                    key={index}
                                                    value={shape?.id}
                                                    control={<Radio />}
                                                    label={
                                                        <>
                                                            <div className={String(current?.shape?.type_id) === shape?.id ? "selected" : ""}>
                                                                <img src={shape?.image} alt={shape.name} />
                                                                {String(current?.shape?.type_id) === shape?.id ? (<span className="right">
                                                                    <CheckBoxSharpIcon sx={{ color: "#E31E24" }} />
                                                                </span>) : null}
                                                            </div>
                                                            <span>{shape.name}</span>
                                                        </>
                                                    }
                                                />))}
                                        </RadioGroup>
                                    )}
                                />
                            ) : (<p className="txt-left not-found" style={{ marginBottom: "40px" }}>No Shapes available!</p>)
                        ) : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <h5>Select Lid</h5>
                        {jarPropertyList ? (
                            jarPropertyList?.data?.lid.length ? (
                                <Controller
                                    name="lid_id"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...field}
                                            name="lid-group"
                                            className="property-selector"
                                            onChange={(e) => updatePropertyHandler(e, "lid_id")}>
                                            {jarPropertyList?.data?.lid.map((lid, index) => (
                                                <FormControlLabel
                                                    key={index}
                                                    value={lid?.id}
                                                    control={<Radio />}
                                                    label={
                                                        <>
                                                            <div className={String(current?.lid?.type_id) === lid?.id ? "selected" : ""}>
                                                                <img src={lid?.image} alt={lid.name} />
                                                                {String(current?.lid?.type_id) === lid?.id ? (<span className="right">
                                                                    <CheckBoxSharpIcon sx={{ color: "#E31E24" }} />
                                                                </span>) : null}
                                                            </div>
                                                            <span>{lid.name}</span>
                                                        </>}
                                                />))}
                                        </RadioGroup>
                                    )}
                                />
                            ) : (<p className="txt-left not-found" style={{ marginBottom: "40px" }}>No Lids available!</p>)
                        ) : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <h5>Select Handle</h5>
                        {jarPropertyList ? (
                            jarPropertyList?.data?.handle.length ? (
                                <Controller
                                    name="handle_id"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...field}
                                            name="handle-group"
                                            className="property-selector alt"
                                            onChange={(e) => updatePropertyHandler(e, "handle_id")}>
                                            {jarPropertyList?.data?.handle.map((hand, index) => (
                                                <FormControlLabel
                                                    key={index}
                                                    value={hand?.id}
                                                    control={<Radio />}
                                                    label={
                                                        <>
                                                            <div className={String(current?.handle?.type_id) === hand?.id ? "selected" : ""}>
                                                                <img src={hand?.image} alt={hand.name} />
                                                                {String(current?.handle?.type_id) === hand?.id ? (<span className="right">
                                                                    <CheckBoxSharpIcon sx={{ color: "#E31E24" }} />
                                                                </span>) : null}
                                                            </div>
                                                            <span>{hand.name}</span>
                                                        </>
                                                    }
                                                />))}
                                        </RadioGroup>
                                    )}
                                />
                            ) : (<p className="txt-left not-found" style={{ marginBottom: "40px" }}>No Handles available!</p>)
                        ) : null}
                    </Grid>
                </>)}
            </Grid>
        </PerfectScrollbar>
    );
}

export default JarProperties;
