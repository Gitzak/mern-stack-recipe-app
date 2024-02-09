import * as React from "react";
import { useEffect, useState, useRef, useContext } from "react";

import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Container, Grid, Paper } from "@mui/material";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateRange } from "../../components/dashboard/DateRange/DateRange";
import CardSales from "../../components/dashboard/cards/CardSales";

export default function Dashboard() {
    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container sx={{ marginBottom: 5, display: "flex", justifyContent: "end" }}>
                <DateRange />
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "auto",
                        }}>
                        <CardSales color="#29ADB2" title="Favorites recipes" value="18" iconName="VolunteerActivismIcon" />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "auto",
                        }}>
                        <CardSales color="#c5f1e0" title="All recipes" value="150" iconName="LocalDiningIcon" />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "auto",
                        }}>
                        <CardSales color="#FECDA6" title="Users" value="291" type="count" iconName="PeopleIcon" />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "auto",
                        }}>
                        <CardSales color="#f1e5c5" title="Admin" value="3" iconName="PeopleIcon" />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
