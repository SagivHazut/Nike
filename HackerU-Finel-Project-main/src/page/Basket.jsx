import React from "react";
import {
  Badge,
  Box,
  Button,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  CardActions,
  IconButton,
} from "@mui/material";
import { RemoveShoppingCart } from "@material-ui/icons";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const ShoppingCartBox = (props) => {
  const { ShoppingCart, clearShoppingCart, handleRemoveButtonClick, date } =
    props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const itemsPrice = ShoppingCart.reduce((a, c) => a + 1 * c.item.phone, 0);

  const handleClick = (event) => {
    if (ShoppingCart.length !== 0) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePayButtonClick = () => {
    clearShoppingCart();
  };

  return (
    <>
      <Button
        variant="contained"
        endIcon={
          <Badge badgeContent={ShoppingCart.length} color="primary">
            <ShoppingCartIcon color="action" />
          </Badge>
        }
        onClick={handleClick}
        sx={{ bgcolor: "grey.400" }}
      >
        Shopping Cart
      </Button>
      <Popover
        id="shoppingCart"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
            <TableBody>
              {ShoppingCart.map((props, index, item) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      style={{
                        textAlign: "center",
                        width: "5vw",
                      }}
                      src={props.item.image}
                      alt="..."
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {props.item.name}
                  </TableCell>
                  <TableCell align="right">${props.item.phone}</TableCell>
                  <TableCell>
                    <CardActions
                      disableSpacing
                      style={{
                        justifyContent: "space-between",
                        margin: "0 auto",
                        width: "50%",
                        display: "flex",
                      }}
                      color="default"
                    >
                      <IconButton
                        color="default"
                        aria-label="Add to Cart"
                        onClick={() => {
                          handleRemoveButtonClick(date);
                        }}
                      >
                        <RemoveShoppingCart />
                      </IconButton>
                    </CardActions>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
          <TableBody>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                bgcolor: "grey.400",
              }}
            >
              <TableCell component="th" scope="row">
                Total price
              </TableCell>
              <TableCell align="right">${itemsPrice}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box sx={{ m: "5px" }}>
          <Button
            sx={{ ml: "auto", display: "flex" }}
            variant="contained"
            size="small"
            onClick={handlePayButtonClick}
          >
            Pay
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default ShoppingCartBox;
