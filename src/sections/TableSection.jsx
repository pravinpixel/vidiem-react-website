import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function TableSection(props) {

    const { data, columns } = props

    return (
        <>
            {
                data ? <DataGrid
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                /> : null
            }
        </>

    );
}