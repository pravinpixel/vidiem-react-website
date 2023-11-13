import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getLocalStorage } from 'helpers/HelperFunctions';
import { CONSTANTS } from 'helpers/AppConstants'
import * as yup from "yup"
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const emojiRegex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

const schema = yup.object({
    isTxt: yup.boolean(),
    personalise: yup.string().when('isTxt', {
        is: (value) => value === true,
        then: (schema) => schema.required('Personalize Message required!').test(
            'len',
            'You can enter only min 3 to 15 characters!',
            (val) => {
                if (val == undefined) {
                    return true;
                }
                return ((val.length == 0 || (val.length >= 1 && val.length <= 15)))
            }
        ).matches(/^[^_!@#$%^&*+=<>:;|~]*$/, {
            message: 'No Special characters allowed!'
        }),
        otherwise: (schema) => schema,
    })
}).required()

const CHARACTER_LIMIT = 15;

function StepPersonalizeMessages(props) {
    const {
        current,
        __moveToggler,
        __toastToggler,
        __updateHandler,
        __previewTxtHandler
    } = props

    const [count, setCount] = useState(0);

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        register,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            isTxt: false,
            personalise: '',
        }
    })

    const watchPersonalise = watch("personalise")

    const onMessageSubmitHandler = (fData) => {
        let formData = {
            uuid: getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION),
            type: "personalise",
            text: fData.personalise
        }
        __updateHandler(formData, "/checkout/shipping-and-billing")
    }

    useEffect(() => {
        if (errors?.personalise) {
            __toastToggler({
                open: true,
                type: 'error',
                message: errors.personalise?.message
            })
        }
    }, [errors])

    useEffect(() => {
        if (current) {
            setValue('personalise', current?.personalise_text);
        }
    }, [current])

    useEffect(() => {
        if (watchPersonalise) {
            const trimedInput = watchPersonalise.replace(emojiRegex, '');
            setCount(trimedInput?.length);
            __previewTxtHandler(trimedInput)
            setValue('isTxt', true);
        }
        else {
            setCount(0);
            __previewTxtHandler("")
            setValue('isTxt', false);
        }
    }, [watchPersonalise])

    return (
        <form
            onSubmit={handleSubmit(onMessageSubmitHandler)}
            className="vi-body-wrapper vi-forms">
            <div className='vi-body-title'>
                <h4>Personalise with a Special Message</h4>
            </div>
            <div className="vi-body-content">
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    className='message-selector'>
                    <Grid item xs={12}>
                        <input
                            type="hidden"
                            name="isTxt"
                            defaultValue=""
                            {...register('isTxt')}
                        />
                        <Controller
                            name="personalise"
                            control={control}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                                formState,
                            }) => (
                                <TextField
                                    fullWidth
                                    hiddenLabel
                                    error={!!error}
                                    onChange={onChange}
                                    value={value}
                                    margin="dense"
                                    variant="filled"
                                    placeholder="Maximum 15 Characters"
                                    helperText={`${count}/${CHARACTER_LIMIT}`}
                                    className="personalize__counter"
                                    inputProps={{
                                        maxLength: CHARACTER_LIMIT
                                    }}
                                    id="personalise"
                                />
                            )}
                        />
                        <p><strong>Disclaimer:</strong> The actual text on the product may differ in shape, design, font, or size depending on availability and suitability.</p>
                    </Grid>
                </Grid>
            </div>
            <div className='vi-body-footer'>
                <div className="buton-wrapper">
                    <Button
                        className='prev'
                        size="medium"
                        startIcon={<ArrowBackIosNewOutlinedIcon />}
                        onClick={(e) => __moveToggler(e, 'jar-styles')}>
                        Back
                    </Button>
                    <Divider orientation="vertical" flexItem />
                    <Button
                        className='next'
                        size="medium"
                        endIcon={<ArrowForwardIosOutlinedIcon />}
                        type='submit'>
                        Next
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default StepPersonalizeMessages;
